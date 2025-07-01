import { ProductService } from "../../services/ProductService";
import { Product } from "../../entities/Product";
import { Repository } from "typeorm";

const mockRepository = (): Partial<Repository<Product>> => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
});

describe("ProductService - Unit", () => {
  let service: ProductService;
  let productRepoMock: ReturnType<typeof mockRepository>;

  beforeEach(() => {
    productRepoMock = mockRepository();
    service = new ProductService(productRepoMock as Repository<Product>);
  });

  it("should create a product", async () => {
    //arrange
    const input = {
      name: "Unit Test Product",
      price: 99.99,
      description: "Test description",
    };
    const fakeProduct = { id: 1, ...input };
    (productRepoMock.create as jest.Mock).mockReturnValue(fakeProduct);
    (productRepoMock.save as jest.Mock).mockResolvedValue(fakeProduct);

    //act
    const result = await service.create(input);

    //assert
    expect(productRepoMock.create).toHaveBeenCalledWith(input);
    expect(productRepoMock.save).toHaveBeenCalledWith(fakeProduct);
    expect(result).toEqual(fakeProduct);
  });

  it("should return all products", async () => {
    //arrange
    const products: Product[] = [
      { id: 1, name: "product a", price: 10, description: "description a" },
      { id: 1, name: "product b", price: 20, description: "description b" },
    ];
    (productRepoMock.find as jest.Mock).mockReturnValue(products);

    //act
    const result = await service.getAll();

    //assert
    expect(result).toEqual(products);
    expect(productRepoMock.find).toHaveBeenCalled();
  });
});

describe("ProductService - delete", () => {
  let mockRepo: Partial<Repository<Product>>;
  let productService: ProductService;

  beforeEach(() => {
    mockRepo = {
      delete: jest.fn(),
    };
    productService = new ProductService(mockRepo as Repository<Product>);
  });

  it("should delete a product by ID", async () => {
    //arrange
    const id = 1;
    (mockRepo.delete as jest.Mock).mockResolvedValue({ affected: 1 });

    //act
    const result = await productService.delete(id);

    //assert
    expect(mockRepo.delete).toHaveBeenCalledWith(id);
    expect(result).toEqual({ success: true });
  });

  it("should return error if prodct is not found", async () => {
    //arrange
    const id = 999;
    (mockRepo.delete as jest.Mock).mockResolvedValue({ affected: 0 });

    //act //assert
    await expect(productService.delete(id)).rejects.toThrow(
      "product not found"
    );
  });
});

describe("ProductService - update", () => {
  let mockRepo: Partial<Repository<Product>>;
  let productService: ProductService;

  beforeEach(() => {
    mockRepo = {
      findOneBy: jest.fn(),
      save: jest.fn(),
    };
    productService = new ProductService(mockRepo as Repository<Product>);
  });

  it('should update a product if it exists', async () => {
    //arrange
    const id = 1;
    const existingProduct = {
      id,
      name: 'old product',
      price: 50,
      description: 'old description'
    };
    const updatedData = {
      name: 'updated product',
      price: 100,
    };
    const updatedProduct = {
      ...existingProduct,
      ...updatedData,
    };
    (mockRepo.findOneBy as jest.Mock).mockResolvedValue(existingProduct);
    (mockRepo.save as jest.Mock).mockResolvedValue(updatedProduct);
    
    //act
    const result = await productService.update(id, updatedData);

    //assert
    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id });
    expect(mockRepo.save).toHaveBeenCalledWith(updatedProduct);
    expect(result).toEqual(updatedProduct);
  });

  it('should throw an error if the product does not exist', async() => {
    //arrange
    const id = 999;
    const updateData = { name: 'does not matter'};
    (mockRepo.findOneBy as jest.Mock).mockResolvedValue(null);

    //act and assert
    await expect(productService.update(id, updateData)).rejects.toThrow('product not found');
  })
});

// Get product by id
describe("ProductService - getById", () => {
  let mockRepo: Partial<Repository<Product>>;
  let productService: ProductService;

  beforeEach(() => {
    mockRepo = {
      findOneBy: jest.fn(),
    };
    productService = new ProductService(mockRepo as Repository<Product>);
  })

  it("should get a product by ID", async () => {
    const id = 1;
    const mockProduct: Product = { 
      id: 1, 
      name: "product a", 
      price: 10, 
      description: "description a" 
    };
    (mockRepo.findOneBy as jest.Mock).mockResolvedValue(mockProduct);

    const result = await productService.getById(id);

    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id });
    expect(result).toEqual(mockProduct);

  })

  it('should throw an error if the product does not exist', async() => {
    const id = 999;
    (mockRepo.findOneBy as jest.Mock).mockResolvedValue(null);

    await expect(productService.getById(id)).rejects.toThrow(new Error('product not found'));
  })
});

// Patch product
describe("ProductService - updateField", () => {
  let mockRepo: Partial<Repository<Product>>;
  let productService: ProductService;

  beforeEach(() => {
    mockRepo = {
      findOneBy: jest.fn(),
      save: jest.fn(),
    };
    productService = new ProductService(mockRepo as Repository<Product>);
  });

  it('should update a field in product if it exists', async () => {
    const id = 1;
    const existingProduct = {
      id,
      name: 'old product',
      price: 50,
      description: 'old description'
    };
    const updatedData = {
      name: 'updated product',
    };
    const updatedField = {
      ...existingProduct,
      ...updatedData,
    };
    (mockRepo.findOneBy as jest.Mock).mockResolvedValue(existingProduct);
    (mockRepo.save as jest.Mock).mockResolvedValue(updatedField);
    
    const result = await productService.updateField(id, updatedData);

    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id });
    expect(mockRepo.save).toHaveBeenCalledWith(updatedField);
    expect(result).toEqual(updatedField);
  });

  it('should throw an error if the product does not exist', async() => {
    const id = 999;
    const updateData = { name: 'any name is ok'};
    (mockRepo.findOneBy as jest.Mock).mockResolvedValue(null);

    await expect(productService.update(id, updateData)).rejects.toThrow('product not found');
  })
});
