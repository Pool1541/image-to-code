'use client';

import { signIn, signOut } from 'next-auth/react';
import { GoogleIcon } from '../icons';
import { Button } from '../ui/button';
import { Avatar } from '../ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger, MenubarItem } from '../ui/menubar';
// import { MenubarItem } from '@radix-ui/react-menubar';

interface Props {
  user: any;
}

export default function AvatarWrapper({ user }: Props) {
  return user ? (
    // <div className='flex items-center gap-2'>
    //   <span>{user.name}</span>
    //   <Button onClick={() => signOut()}>Cerrar sesión</Button>
    // </div>
    <Menubar className='bg-none border-none'>
      <MenubarMenu>
        <MenubarTrigger style={{ background: 'none !important' }} className='cursor-pointer'>
          <Avatar>
            <AvatarImage src={user.image} />
          </Avatar>
        </MenubarTrigger>
        <MenubarContent className='min-w-[3rem]'>
          <MenubarItem>
            <button onClick={() => signOut()}>Salir</button>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ) : (
    <Button className='flex gap-2 items-center transition-colors' onClick={() => signIn('google')}>
      <GoogleIcon />
      <span>Ingresar</span>
    </Button>
  );
}
