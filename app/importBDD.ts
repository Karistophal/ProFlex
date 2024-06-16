import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function importData() {
  try {
    // Lire le fichier JSON
    const jsonData = fs.readFileSync('exported_data.json', 'utf8');
    const data = JSON.parse(jsonData);

    // Insérer les données dans la nouvelle base de données
    await prisma.account.createMany({ data: data.account });
    await prisma.cartItem.createMany({ data: data.cartItem });
    await prisma.category.createMany({ data: data.category });
    await prisma.image.createMany({ data: data.image });
    await prisma.order.createMany({ data: data.order });
    await prisma.orderItem.createMany({ data: data.orderItem });
    await prisma.product.createMany({ data: data.product });
    await prisma.productCategory.createMany({ data: data.productCategory });
    await prisma.productTrending.createMany({ data: data.productTrending });
    await prisma.productType.createMany({ data: data.productType });
    await prisma.review.createMany({ data: data.review });
    await prisma.session.createMany({ data: data.session });
    await prisma.user.createMany({ data: data.user });

    // Insérer les données dans la nouvelle base de données


    console.log('Les données ont été importées avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'importation des données :', error);
  }
}

export default importData;
