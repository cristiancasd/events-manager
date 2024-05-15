import { CommerceUserRoles } from "../../../../core";
import { UserUseCase } from "../../../user";

export const  seedUsersService=async (userUseCase: UserUseCase, commerceUid: string, levelUid1: string, levelUid2: string)=>  {
  

  let userUid1='';
    let userUid2='';

    const user1={
      id:'',
      name: "User 1 Name",
      password: "user1name",
      phone: "1111",
      document:"11111111",
      commerceUserId: "L11111",
      email: "user1@user1.com",
      role: CommerceUserRoles.user,
      levelUid: levelUid1,
      commerceUid,
      isActive: true,
      freeSpace:"prueba"
    };

    const user2={
      id:'',
      name: "User 2 Name",
      password: "user2name",
      phone: "2222",
      document:"222222",
      commerceUserId: "L2222",
      email: "user2@user2.com",
      role: CommerceUserRoles.admin,
      levelUid: levelUid2,
      commerceUid,
      isActive: true,
      freeSpace:"prueba"
    };
    
    try{
      const user1Created= await userUseCase.createUser(user1)
      userUid1= user1Created.id;
    }catch(err){
      const userFound= await userUseCase.findUserCommerceByEmail(commerceUid, user1.email);
      userUid1=userFound.id;
    }

    try{
      const user2Created= await userUseCase.createUser(user2)
      userUid2= user2Created.id;
    }catch(err){
      const userFound= await userUseCase.findUserCommerceByEmail(commerceUid, user2.email);
      userUid2=userFound.id;
    }
    return { userUid1, userUid2 };
  }