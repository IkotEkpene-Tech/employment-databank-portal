import styled from "styled-components";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui";
import type { User } from "@/features/auth/api/types";

const List = styled.dl`
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const Item = styled.div`
  padding: 0.7rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }
`;

const DT = styled.dt`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0 0 0.3rem;
`;

const DD = styled.dd`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0;
  word-break: break-word;
`;

const Pending = styled(DD)`
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-weight: 500;
  font-style: italic;
`;

export const ProfileSummaryCard = ({ user }: { user: User }) => {
  const hasVerifiedNin = Boolean(user.firstName && user.surname);
  const fullName = hasVerifiedNin ? `${user.firstName} ${user.otherName ?? ""} ${user.surname}`.trim() : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Summary</CardTitle>
        <CardDescription>Your account and verified application details</CardDescription>
      </CardHeader>
      <CardContent>
        <List>
          <Item>
            <DT>Full Name</DT>
            {fullName ? <DD>{fullName}</DD> : <Pending>Not yet verified</Pending>}
          </Item>
          <Item>
            <DT>Email</DT>
            <DD>{user.email}</DD>
          </Item>
          <Item>
            <DT>Phone</DT>
            <DD>{user.phone}</DD>
          </Item>
          <Item>
            <DT>NIN</DT>
            {user.ninLast4 ? <DD>●●●●●●●{user.ninLast4}</DD> : <Pending>Not yet verified</Pending>}
          </Item>
        </List>
      </CardContent>
    </Card>
  );
};
