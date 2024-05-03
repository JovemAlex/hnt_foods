import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      {products ? (
        <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5">
          {products.map((e) => (
            <ProductItem key={e.id} product={e} />
          ))}
        </div>
      ) : (
        <h1>Produtos não encontrados</h1>
      )}
    </>
  );
};

export default ProductList;
