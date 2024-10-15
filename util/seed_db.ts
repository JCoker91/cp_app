/* eslint-disable prettier/prettier */
import bcrypt from "bcrypt";
import { db, VercelPoolClient } from "@vercel/postgres";

import { users } from "../types/seed-data";

async function seedUsers({ client }: {client: VercelPoolClient}) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      avatar TEXT NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      is_admin BOOLEAN NOT NULL DEFAULT FALSE,
      createdAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
      updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      return client.sql`
        INSERT INTO users (first_name, last_name, email, password, avatar, is_admin)
        VALUES (${user.firstName}, ${user.lastName}, ${user.email}, ${hashedPassword}, ${user.avatar}, ${user.role === "admin"});
      `;
    }),
  );

  return insertedUsers;
}

// async function seedInvoices() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       customer_id UUID NOT NULL,
//       amount INT NOT NULL,
//       status VARCHAR(255) NOT NULL,
//       date DATE NOT NULL
//     );
//   `;

//   const insertedInvoices = await Promise.all(
//     invoices.map(
//       (invoice) => client.sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedInvoices;
// }

// async function seedCustomers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS customers (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       image_url VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedCustomers = await Promise.all(
//     customers.map(
//       (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedCustomers;
// }

// async function seedRevenue() {
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS revenue (
//       month VARCHAR(4) NOT NULL UNIQUE,
//       revenue INT NOT NULL
//     );
//   `;

//   const insertedRevenue = await Promise.all(
//     revenue.map(
//       (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedRevenue;
// }

export async function GET() {
  const client = await db.connect();

  try {
    await client.sql`BEGIN`;
    let createdUsers = await seedUsers({client: client});

    // await seedCustomers();
    // await seedInvoices();
    // await seedRevenue();
    await client.sql`COMMIT`;

    return Response.json({ message: `Created Users:\n${createdUsers[0].rows.map((res) => res)}` });
  } catch (error) {
    await client.sql`ROLLBACK`;

    return Response.json({ error }, { status: 500 });
  }

}
