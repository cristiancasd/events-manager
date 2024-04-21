import {
  CommerceEntity,
  CommerceUseCase,
  TypeOrmLevelRepository
} from '../../../../features';
import { v4 as uuidv4 } from 'uuid';
import { LevelEntity } from '../../../../features/levels/domain/level.entity';

/*const mockCommerceRepository = {
    findByUniqueColumn: jest.fn(),
    createCommerce: jest.fn(),
    deleteCommerce: jest.fn(),
    disableCommerce: jest.fn(),
    enableCommerce: jest.fn(),
    findCommerceById: jest.fn(),
    findCommerces: jest.fn(),
  };

  let mockCommerceUseCase: CommerceUseCase = new CommerceUseCase(mockCommerceRepository);
*/

const mockCommerceUseCase: CommerceUseCase =
  jest.genMockFromModule<CommerceUseCase>('../../../../features');
let levelRepository: TypeOrmLevelRepository;
let myuuid = uuidv4();

const mockCommerce: CommerceEntity = {
  id: myuuid,
  city: '',
  countryCode: '',
  dateFinish: '',
  email: '',
  isActive: true,
  name: '',
  nick: '',
  phone: '',
  totalFreePrevent: 1
};

describe('TypeOrmLevelRepository - findLevelByName', () => {
  beforeEach(() => {
    // Creamos una instancia del TypeOrmLevelRepository con el mock del CommerceUseCase
    levelRepository = new TypeOrmLevelRepository(mockCommerceUseCase);
  });

  it('should return null if no level is found with the given name', async () => {
    // Simulamos que no se encuentra ningún nivel con el nombre dado
    jest.spyOn(levelRepository, 'findLevelByName').mockResolvedValueOnce(null);
    const result = await levelRepository.findLevelByName(
      myuuid,
      'nonExistingName'
    );
    expect(result).toBeNull();
  });

  it('should return the correct level if found with the given name', async () => {
    // Simulamos que se encuentra un nivel con el nombre dado
    const mockLevel: LevelEntity = {
      id: '1',
      name: 'existingName',
      commerceUid: '',
      typeId: 1
    };
    jest
      .spyOn(levelRepository, 'findLevelByName')
      .mockResolvedValueOnce(mockLevel);

    const result = await levelRepository.findLevelByName(
      myuuid,
      'existingName'
    );
    expect(result).toEqual(mockLevel);
  });

  it('should handle errors gracefully', async () => {
    // Simulamos un error durante la búsqueda del nivel
    jest
      .spyOn(levelRepository, 'findLevelByName')
      .mockRejectedValueOnce(new Error('Database error'));
    await expect(
      levelRepository.findLevelByName(myuuid, 'existingName')
    ).rejects.toThrow('Database error');
  });
});

describe('createLevel', () => {
  beforeEach(() => {
    // Creamos una instancia del TypeOrmLevelRepository con el mock del CommerceUseCase
    levelRepository = new TypeOrmLevelRepository(mockCommerceUseCase);
  });

  it('should create and return a new level if commerce is found', async () => {
    // Mock de la función findComerceByUid del caso de uso de comercio
    jest
      .spyOn(mockCommerceUseCase, 'findComerceByUid')
      .mockResolvedValueOnce(mockCommerce);

    // Mock del nuevo nivel a crear
    const mockLevelData: LevelEntity = {
      id: '1',
      name: 'existingName',
      commerceUid: '',
      typeId: 1
    };

    const result = await levelRepository.createLevel(mockLevelData);

    expect(result).toEqual(mockLevelData);
    expect(levelRepository.createLevel).toHaveBeenCalledWith({
      ...mockLevelData,
      commerce: mockCommerce
    });
  });
});

/*
  describe('createLevel', () => {
    it('should create and return a new level if commerce is found', async () => {
     
        // Mock de la función findComerceByUid del caso de uso de comercio
      jest.spyOn(mockCommerceUseCase, 'findComerceByUid').mockResolvedValueOnce(mockCommerce);

      // Mock del nuevo nivel a crear
      const mockLevelData: LevelEntity = { id: '1', name: 'existingName', commerceUid:'', typeId:1 };

      // Mock del repositorio de niveles
      const mockLevelRepository = {
        create: jest.fn().mockReturnValue(mockLevelData),
        save: jest.fn().mockResolvedValueOnce(mockLevelData),
      };

      const result = await levelRepository.createLevel(mockLevelData);

      expect(result).toEqual(mockLevelData);
      expect(mockLevelRepository.create).toHaveBeenCalledWith(mockLevelData);
      expect(mockLevelRepository.save).toHaveBeenCalledWith({
        ...mockLevelData,
        commerce: mockCommerce,
      });
    });

    it('should throw an error if commerce is not found', async () => {
      // Mock de la función findComerceByUid que devuelve null para simular que no se encontró el comercio
      jest.spyOn(mockCommerceUseCase, 'findComerceByUid').mockResolvedValueOnce(null);

      // Mock del nuevo nivel a crear
      const mockLevelData = {  datos del nivel  };

      await expect(errorHandler.createLevel(mockLevelData)).rejects.toThrow('Commerce not found');
    });
  });*/
