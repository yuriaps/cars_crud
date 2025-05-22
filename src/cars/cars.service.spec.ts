import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { getModelToken } from '@nestjs/mongoose';
import { Car } from './entities/car.entity';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

const mockCar = {
  _id: '665053b53ffb95b960c7ba49',
  marca: 'Toyota',
  modelo: 'Corolla',
  ano: 2022,
  renavam: '123456789',
  chassi: 'ABC123XYZ789',
  placa: 'XYZ-1234',
};

const nonExsistentId = "665053b53ffb95b960c7ba40"

describe('CarsService', () => {
  let service: CarsService;
  let model: Model<Car>;

  const mockCarModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: getModelToken('Car'),
          useValue: mockCarModel,
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
    model = module.get<Model<Car>>(getModelToken('Car'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a car', async () => {
      mockCarModel.create.mockResolvedValue(mockCar);
      const result = await service.create(mockCar as any);
      expect(result).toEqual(mockCar);
      expect(mockCarModel.create).toHaveBeenCalledWith(mockCar);
    });
  });

  describe('findAll', () => {
    it('should return all cars', async () => {
      mockCarModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockCar]),
      });
      const result = await service.findAll();
      expect(result).toEqual([mockCar]);
      expect(mockCarModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return one car', async () => {
      mockCarModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockCar),
      });
      const result = await service.findOne(mockCar._id);
      expect(result).toEqual(mockCar);
    });

    it('should throw NotFoundException if car not found', async () => {
      mockCarModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      await expect(service.findOne(nonExsistentId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update and return the car', async () => {
      const updatedCar = { ...mockCar, modelo: 'Yaris' };
      mockCarModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(updatedCar),
      });
      const result = await service.update(mockCar._id, { modelo: 'Yaris' });
      expect(result).toEqual(updatedCar);
    });

    it('should throw NotFoundException if car not found', async () => {
      mockCarModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      await expect(
        service.update(nonExsistentId, { modelo: 'Yaris' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the car', async () => {
      mockCarModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockCar),
      });
      const result = await service.remove(mockCar._id);
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException if car not found', async () => {
      mockCarModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      await expect(service.remove(nonExsistentId)).rejects.toThrow(NotFoundException);
    });
  });
});
