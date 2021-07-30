export interface InvitationRequest {
  invitationTemplateId: number;
  subject: string;
  parameters: string;
  peopleAmount: number;
  childrenAmount: number;
  note: string;
}
