import { SetMetadata } from "@nestjs/common";
import { ADMIN_KEY } from "../../constants/key-decorators";
import { UserRole } from "../../constants/roles";

export const AdminAccess = () => SetMetadata(ADMIN_KEY, UserRole.ADMIN)