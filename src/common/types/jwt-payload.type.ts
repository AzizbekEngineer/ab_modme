import { UserRole, UserStatus } from "../../users/entities/user.entity";

export interface JwtPayload {
  role: UserRole;
  id: number;
  branch_id: number;
  full_name: string;
  username: string;
  status: UserStatus;
}
