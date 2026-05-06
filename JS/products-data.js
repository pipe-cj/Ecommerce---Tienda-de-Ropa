// Base de datos de productos con información detallada
const productsDatabase = [
  {
    id: 1,
    name: "Camiseta Ecológica",
    slug: "camiseta-ecologica",
    price: 14990,
    image: "IMG/camiseta.jpg",
    description: "Camiseta de algodón orgánico, cómoda y amigable con el medio ambiente.",
    longDescription: "Nuestra camiseta ecológica está hecha con algodón orgánico certificado. Perfecta para el día a día, ofrece comodidad excepcional y se alinea con tu compromiso con la sostenibilidad.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    color: "Natural"
  },
  {
    id: 2,
    name: "Pantalón Sostenible",
    slug: "pantalon-sostenible",
    price: 24990,
    image: "IMG/pantalon.jpg",
    description: "Pantalón hecho con fibras recicladas, resistente y ecológico.",
    longDescription: "Fabricado con fibras recicladas de primera calidad. Este pantalón combina durabilidad con responsabilidad ambiental. Ideal para cualquier ocasión.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    color: "Azul Oscuro"
  },
  {
    id: 3,
    name: "Vestido Verde",
    slug: "vestido-verde",
    price: 29990,
    image: "IMG/vestido.jpg",
    description: "Vestido elegante fabricado con telas sostenibles y tintes naturales.",
    longDescription: "Un vestido que combina elegancia y conciencia ambiental. Hecho con telas sostenibles y tintes naturales, es perfecto para cualquier evento.",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Verde"
  },
  {
    id: 4,
    name: "Chaqueta Ecológica",
    slug: "chaqueta-ecologica",
    price: 39990,
    image: "IMG/Chaqueta.webp",
    description: "Chaqueta ligera de materiales reciclados, perfecta para cualquier clima.",
    longDescription: "Nuestra chaqueta ecológica ofrece protección ligera sin comprometer la sostenibilidad. Hecha con materiales reciclados de alta calidad.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    color: "Negro"
  },
  {
    id: 5,
    name: "Zapatos Sostenibles",
    slug: "zapatos-sostenibles",
    price: 34990,
    image: "IMG/zapatos.jpg",
    description: "Zapatos cómodos hechos con cuero vegano y suelas recicladas.",
    longDescription: "Comodidad y sostenibilidad en cada paso. Nuestros zapatos están hechos con cuero vegano premium y suelas recicladas.",
    sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43"],
    color: "Marrón"
  },
  {
    id: 6,
    name: "Sombrero Eco",
    slug: "sombrero-eco",
    price: 11990,
    image: "IMG/Sombrero.webp",
    description: "Sombrero de paja orgánica, ideal para protegerte del sol de manera sostenible.",
    longDescription: "Fabricado con paja orgánica tejida artesanalmente. El complemento perfecto para un día soleado con estilo ecológico.",
    sizes: ["Único"],
    color: "Natural"
  }
];

// Función para obtener un producto por ID
function getProductById(id) {
  return productsDatabase.find(product => product.id === id);
}

// Función para obtener un producto por slug
function getProductBySlug(slug) {
  return productsDatabase.find(product => product.slug === slug);
}
