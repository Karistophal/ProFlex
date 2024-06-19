"use client";
import AccountModal from '@/app/components/account/accountModal'

import Hr from '@/app/components/Hr';
import Input from '@/app/components/account/input';
import { SafeUser } from '@/app/types';


interface profilPageProps {
  user: SafeUser | null
}

const PrivacyPage: React.FC<profilPageProps> = ({ user }) => {


  const bodyContent = (
    <div className='h-[300px] font-bold text-2xl flex justify-center items-center text-gray-700'>
      Fonctionnalité à venir
    </div>
  );

  return (
    <AccountModal title="Confidentialité" body={bodyContent} mode='privacy' user={user} />
  )
}

export default PrivacyPage