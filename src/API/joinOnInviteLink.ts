export const joinOnInviteLink = () => {
  const { hash } = window.location;
  if (hash !== '') {
    const cutHash = hash.slice(2);
    return cutHash;
  }
  return '';
};

export const createInviteLink = (roomId: string) => {
  const url = new URL(`#/${roomId}`, window.location.origin);
  return url.toString();
};
