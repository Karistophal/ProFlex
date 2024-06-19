
import prisma from '../../libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

export async function POST() {
    const user = await getCurrentUser();
    console.log(user);
    
    if (!user) {
        return NextResponse.json({ error: 'No user found' }, { status: 404 });
    }
    try {
        await prisma.user.delete({
            where: {
                id : user.id
            }
        });
        return NextResponse.json({ success: 'User deleted' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
    }
}