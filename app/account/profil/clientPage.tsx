"use client";
import AccountModal from '@/app/components/account/accountPage'

import Hr from '@/app/components/Hr';
import Input from '@/app/components/account/input';
import { SafeUser } from '@/app/types';

interface profilPageProps {
  user: SafeUser | null
}

const ProfilPage: React.FC<profilPageProps> = ({ user }) => {

  const bodyContent = (
    <div>
      <div className="flex flex-col justify-center">
        <div className="text-2xl font-bold mb-4">
          Informations personnelles
        </div>
        <Hr />
        <div className="flex flex-col justify-center mt-4">
          <div className="">
            <div className="text-2xl font-bold">Prénom</div>
            <Input label={user?.name ? user.name : "Non défini"} onClick={() => { }} disabled />
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">Adresse mail</div>
            <Input label={user?.email ? user.email : "Non défini"} onClick={() => { }} disabled />
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold">Téléphone</div>
            <Input label={"Non défini"} onClick={() => { }} disabled />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AccountModal title="Profil" body={bodyContent} mode='profil' user={user} />
  )
}

export default ProfilPage