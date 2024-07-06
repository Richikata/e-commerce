import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  //Create a mock for the typeOrm repository
  const mockRepository = {
    find: jest.fn(),
    fineOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => should create a new user and return its data', async () => {
    //arrange
    const createUserDto = {
      name: 'Test Name',
      email: 'testname@email.com',
    } as CreateUserDto;

    const user = {
      id: Date.now().toString(),
      name: 'Test Name',
      email: 'testname@email.com',
      isVerified: false,
    } as User;

    jest.spyOn(mockRepository, 'save').mockReturnValue(user);

    //act
    const result = await service.create(createUserDto);

    //assert
    expect(mockRepository.save).toBeCalled();
    expect(mockRepository.save).toBeCalledWith(createUserDto);

    expect(result).toEqual(user);
  });
});
