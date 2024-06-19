
import getCurrentUser from '@/app/actions/getCurrentUser';
import PrivacyPage from '@/app/account/privacy/clientPage';

export default async function ProfilPageServer() {
    const user = await getCurrentUser();

    return (
        <PrivacyPage user={user} />
    )

}
