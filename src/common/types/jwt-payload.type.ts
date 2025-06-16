import { UserRole, UserStatus } from "../../users/entities/user.entity";

export interface JwtPayload {
  role: UserRole;
  id: string;
  center_id: string;
  branch_id: string;
  full_name: string;
  username: string;
  status: UserStatus;
}
