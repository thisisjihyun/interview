const request = require("supertest");
const data = require("./data");
const app = require("./index");

const newProduct = {
  name: "product 3",
  description: "A new product",
  price: 300,
  parts: [
    {
      partName: "frameType",
      options: [{ option: "Full-suspension", stock: 5 }],
    },
    {
      partName: "frameFinish",
      options: [{ option: "Matte", stock: 4 }],
    },
    {
      partName: "wheels",
      options: [{ option: "Road wheels", stock: 8 }],
    },
    {
      partName: "rimColor",
      options: [{ option: "Red", stock: 5 }],
    },
    {
      partName: "chain",
      options: [{ option: "Single-speed chain", stock: 5 }],
    },
  ],
};

const updatedProduct = {
  name: "Updated product 1",
  description: "Updated description",
  price: 600,
  parts: [
    {
      partName: "frameType",
      options: [{ option: "Diamond", stock: 3 }],
    },
    {
      partName: "frameFinish",
      options: [{ option: "Shiny", stock: 2 }],
    },
    {
      partName: "wheels",
      options: [{ option: "Mountain wheels", stock: 4 }],
    },
    {
      partName: "rimColor",
      options: [{ option: "Blue", stock: 2 }],
    },
    {
      partName: "chain",
      options: [{ option: "8-speed chain", stock: 1 }],
    },
  ],
};

describe("Product API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all products", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(data);
  });

  it("should create a new product", async () => {
    const response = await request(app)
      .post("/products")
      .send(newProduct)
      .set("Accept", "application/json");
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(expect.objectContaining(newProduct));
  });

  it("should update a product", async () => {
    const response = await request(app)
      .put("/products/1")
      .send(updatedProduct)
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toContainEqual(expect.objectContaining(newProduct));
  });

  it("should delete a product", async () => {
    const response = await request(app).delete("/products/3");
    expect(response.status).toBe(200);
  });

  it("should return 404 if a product does not exist", async () => {
    const response = await request(app).delete("/products/999");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Product not found");
  });
});
