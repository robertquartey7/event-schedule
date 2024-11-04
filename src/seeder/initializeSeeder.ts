import { AppDataSource } from "../data-source"; // Adjust the import path as needed
import { User } from "../entity/User"; // Adjust the import path
import { Business } from "../entity/Business"; // Adjust the import path
import { Booking } from "../entity/Booking"; // Adjust the import path
import {faker} from '@faker-js/faker';

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

const NUM_USERS = 10; // Number of users to create
const NUM_BUSINESSES = 5; // Number of businesses to create
const NUM_BOOKINGS_PER_USER = 3; // Number of bookings per user

async function seed() {
  await AppDataSource.initialize();
  const userRepository = AppDataSource.getRepository(User);
  const businessRepository = AppDataSource.getRepository(Business);
  const bookingRepository = AppDataSource.getRepository(Booking);

  // Clear existing data
  await userRepository.clear();
  await businessRepository.clear();
  await bookingRepository.clear();

  // Create fake users
  const users = [];
  for (let i = 0; i < NUM_USERS; i++) {
    const user = new User();
    user.id = faker.string.uuid(); // Generate a unique ID
    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.password = faker.internet.password(); // Make sure to hash this in real apps
    user.is_active = faker.datatype.boolean();
    users.push(user);
  }
  await userRepository.save(users);

  // Create fake businesses
  const businesses = [];
  for (let i = 0; i < NUM_BUSINESSES; i++) {
    const business = new Business();
    business.id = faker.string.uuid(); // Generate a unique ID
    business.business_name = faker.company.name();
    business.user_id = getRandomElement(users).id;
    business.address = faker.location.streetAddress();
    business.website = `www`;
    businesses.push(business);
  }
  console.log(businesses);
  await businessRepository.save(businesses);

  // Create fake bookings
  // const bookings = [];
  // for (const user of users) {
  //   for (let j = 0; j < NUM_BOOKINGS_PER_USER; j++) {
  //     const booking = new Booking();
  //     booking.id = faker.string.uuid(); // Generate a unique ID
  //     booking.business_id = getRandomElement(businesses).id; // Randomly associate a business
  //     booking.user_id = user.id; // Associate with the current user
  //     booking.booking_date = faker.date.future(); // Random future date
  //     booking.status = getRandomElement(['pending', 'confirmed', 'cancelled']);
  //     bookings.push(booking);
  //   }
  // }
  // await bookingRepository.save(bookings);

  // const b = new Business();
  // b.id = faker.string.uuid(); // Generate a unique ID
  // b.business_name = faker.company.name();
  // b.user_id = getRandomElement(users).id;
  // b.address = faker.location.streetAddress();
  // b.website = `www`;

  // await b.save();

  console.log("Seeding completed!");
}

seed()
  .then(() => console.log("Data seeded successfully!"))
  .catch(error => console.error("Error seeding data:", error.message))
  .finally(() => AppDataSource.destroy());
