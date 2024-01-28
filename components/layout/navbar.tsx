import AvatarWrapper from '@/components/home/avatar-wrapper';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return <AvatarWrapper user={session?.user} />;
}
