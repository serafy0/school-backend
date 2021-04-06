exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable("user", (table) => {
    table
      .uuid("id")
      .unique()
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));

    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").notNullable().unique();
    table.string("phone_number");
    table.string("password");
    table.string("token");
    table.string("refresh_token").unique();
    table.dateTime("token_expiration_date");
    table.boolean("email_verified").defaultTo(false);

    table.enum("role", ["STUDENT", "TEACHER", "PARENT"]).defaultTo("STUDENT");
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTableIfExists("user");
};
