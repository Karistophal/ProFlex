
import getCurrentUser from '@/app/actions/getCurrentUser';
import ProfilPage from '@/app/account/profil/clientPage';

export default async function ProfilPageServer() {
    const user = await getCurrentUser();

    return (
        <ProfilPage user={user} />
    )

}
