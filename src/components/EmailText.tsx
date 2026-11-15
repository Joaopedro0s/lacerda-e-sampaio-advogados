/** E-mail com ponto de quebra só depois do "@", para nunca partir no meio de uma palavra. */
export function EmailText({ email }: { email: string }) {
  const [user, domain] = email.split("@");
  return (
    <span>
      {user}@<wbr />
      {domain}
    </span>
  );
}
