
import { UserRole } from "../../models/Users/UserRole.mjs";
import {factory} from "../CRUDFactory/package.mjs";



// GET userRoles
export const  getUserRoles= factory.getAll(UserRole)

// POST userRoles
export const  addUserRole= factory.createOne(UserRole)

// GET userRoles:elementId 
export const  getUserRole= factory.getOne(UserRole)

// PATCH userRoles:elementId 
export const  updateUserRole= factory.updateOne(UserRole)

// DELETE userRoles:elementId
export const  deleteUserRole= factory.deleteOne(UserRole)
