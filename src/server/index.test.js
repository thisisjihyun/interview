const request = require("supertest");
const data = require("./data");
const app = require("./index");

describe("Bicycle API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all bicycles", async () => {
    const response = await request(app).get("/api/bicycles");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(data);
  });

  it("should create a new bicycle", async () => {
    const newBicycle = {
      name: "Bike 3",
      description: "A new bike",
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

    const response = await request(app)
      .post("/api/bicycles")
      .send(newBicycle)
      .set("Accept", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(data);
  });

  it("should update a bicycle", async () => {
    const updatedBicycle = {
      name: "Updated Bike 1",
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

    const response = await request(app)
      .put("/api/bicycles/1")
      .send(updatedBicycle)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedBicycle);
  });

  it("should delete a bicycle", async () => {
    const response = await request(app).delete("/api/bicycles/3");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Bicycle deleted successfully");
  });

  it("should return 404 if a bicycle does not exist", async () => {
    const response = await request(app).delete("/api/bicycles/999");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Bicycle not found");
  });
});
