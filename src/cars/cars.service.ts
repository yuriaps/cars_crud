// src/cars/cars.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car, CarDocument } from './schemas/car.schema';
import { Model } from 'mongoose';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    return this.carModel.create(createCarDto);
  }

  async findAll(): Promise<Car[]> {
    return this.carModel.find().exec();
  }

  async findOne(id: string): Promise<Car> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const car = await this.carModel.findById(id).exec();
    if (!car) throw new NotFoundException('Car not found');
    return car;
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const updated = await this.carModel.findByIdAndUpdate(id, updateCarDto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Car not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const result = await this.carModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Car not found');
  }
}
