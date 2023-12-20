import AvatarWrapper from '@/components/home/avatar-wrapper';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return <AvatarWrapper user={session?.user} />;
}
