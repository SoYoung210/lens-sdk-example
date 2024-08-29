import { useLogout } from '@lens-protocol/react-web';
import { Primitive } from '@radix-ui/react-primitive';
import { ReactNode } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

export function LogoutButton({ children }: { children: ReactNode }) {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { execute } = useLogout();

  const logout = () => {
    void execute();
    disconnect();
  };

  if (!isConnected) {
    return null;
  }

  return (
    <Primitive.button asChild onClick={() => logout()}>
      {children}
    </Primitive.button>
  );
}
