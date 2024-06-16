import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function exportData() {
  try {
    // Récupérer les données des différentes tables
    const account = await prisma.account.findMany();
    const adress = await prisma.adress.findMany();
    const cartItem = await prisma.cartItem.findMany();
    const category = await prisma.category.findMany();
    const image = await prisma.image.findMany();
    const order = await prisma.order.findMany();
    const orderItem = await prisma.orderItem.findMany();
    const product = await prisma.product.findMany();
    const productCategory = await prisma.productCategory.findMany();
    const productTrending = await prisma.productTrending.findMany();
    const productType = await prisma.productType.findMany();
    const review = await prisma.review.findMany();
    const session = await prisma.session.findMany();
    const user = await prisma.user.findMany();


    // Créer un objet avec les données des différentes tables
    const data = {
      account,
      adress,
      cartItem,
      category,
      image,
      order,
      orderItem,
      product,
      productCategory,
      productTrending,
      productType,
      review,
      session,
      user,
    };
    // Convertir les données en JSON
    const jsonData = JSON.stringify(data, null, 2);

    // Écrire les données dans un fichier JSON
    fs.writeFileSync('exported_data.json', jsonData, 'utf8');

    console.log('Les données ont été exportées avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'exportation des données :', error);
  }
}

export default exportData;
