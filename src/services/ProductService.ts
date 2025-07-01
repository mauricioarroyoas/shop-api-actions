import { Product } from "../entities/Product";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

export class ProductService {
  private productRepository: Repository<Product>;

  constructor(repo?: Repository<Product>) {
    this.productRepository = repo || AppDataSource.getRepository(Product);
  }

  async create(data: Omit<Product, "id">): Promise<Product> {
    const product = this.productRepository.create(data);
    return await this.productRepository.save(product);
  }

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async update(id: number, productChanges: Partial<Omit<Product, 'id'>>): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if(!product) {
      throw new Error('product not found');
    }

    const updated = {...product, ...productChanges};
    return await this.productRepository.save(updated);
  }

  async delete(id: number): Promise<{ success: boolean }> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new Error("product not found");
    }

    return { success: true };
  }

  async getById(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({id});
    if (!product) {
      throw new Error("product not found");
    }
    return product
  }

  async updateField(id: number, fieldChanged: Partial<Omit<Product, "id">>): Promise<Product> {
    const product = await this.productRepository.findOneBy({id});

    if (!product) {
      throw new Error("product not found");
    }

    const fieldUpdated = {...product, ...fieldChanged};
    return await this.productRepository.save(fieldUpdated);
  }
}
