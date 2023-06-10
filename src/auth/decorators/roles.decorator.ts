import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "../../constants/key-decorators";
import { UserRole } from "../../constants/roles";

export const Roles = (...roles: Array <keyof typeof UserRole>) => 
SetMetadata(ROLES_KEY, true)