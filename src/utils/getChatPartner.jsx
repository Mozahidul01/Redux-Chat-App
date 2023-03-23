export default function getChatPartner(participants, email) {
  return participants.find((participant) => participant.email !== email);
}
