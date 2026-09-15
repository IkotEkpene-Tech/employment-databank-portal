import { Link } from "react-router-dom";
import styled from "styled-components";
import { CheckCircle2 } from "lucide-react";
import { Button, Card, CardContent } from "@/shared/ui";

const Wrap = styled(Card)`
  max-width: 32rem;
  margin: 3rem auto;
  text-align: center;
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin: 0 0 0.5rem;
`;

const List = styled.ul`
  text-align: left;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  line-height: 1.8;
`;

export const SuccessState = () => (
  <Wrap>
    <CardContent>
      <IconWrap>
        <CheckCircle2 size={56} color="#0B4923" />
      </IconWrap>
      <Title>Registration Successful!</Title>
      <p>Your employment registration has been submitted for review.</p>
      <List>
        <li>Your details will be reviewed by the LGA employment team.</li>
        <li>You'll be notified of job or training opportunities that match your profile.</li>
        <li>You can check your status anytime from your dashboard.</li>
      </List>
      <Button asChild style={{ width: "100%" }}>
        <Link to="/dashboard">Back to Dashboard</Link>
      </Button>
    </CardContent>
  </Wrap>
);
