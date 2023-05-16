
import { UserRole } from "../../models/Users/UserRole.mjs";
import * as factory from "../CRUDFactory.mjs";



// GET userRoles
export const  getUserRoles= factory.getAll(UserRole)

// POST userRoles
export const  addUserRole= factory.CreateOne(UserRole)

// GET userRoles:elementId 
export const  getUserRole= factory.getOne(UserRole)

// PATCH userRoles:elementId 
export const  updateUserRole= factory.updateOne(UserRole)

// DELETE userRoles:elementId
export const  deleteUserRole= factory.deleteOne(UserRole)
