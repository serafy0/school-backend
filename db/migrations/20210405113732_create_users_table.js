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

    //student stuff
    //list of attending courses many to many

    // table.string("courses_list_code").references();

    //list of feedback taken one student to many feedbacks

    //teacher
    //list of courses many to many too can be the same

    //list of feedbacks given to students one to many student_feedback

    //parent
    table.uuid("parent_id").references("id").inTable("user");
  });

  //comment on feedback
  // table.uuid("user p")
  await knex.schema.createTable("course", (table) => {
    table.string("code", 5).unique().notNullable().primary();

    table.string("name").notNullable();
    table.string("description");

    //each course should have a list of periods aka sessions
    //each course should have many students

    table.uuid("teacher_id").references("id").inTable("user"); //one to one

    // table many students
    //table can have many dates in the format Weekday/hour
  });

  // a course can have many
  await knex.schema.createTable("course_in_timetable", (table) => {
    table
      .string("course_code")
      .references("code")
      .inTable("course")
      .onDelete("CASCADE"); // If Article is deleted, delete Comment as well.
    table.time("course_time");
    table.enum("weekday", [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ]);
  });

  await knex.schema.createTable("course_student", (table) => {
    table.string("course_code", 5).references("code").inTable("course");
    table.uuid("student_id").references("id").inTable("user");

    table.primary(["course_code", "student_id"]);
  });

  // await knex.schema.createTable("course_session", (table) => {
  //   table.string("course_code", 5).references("code").inTable("course");
  //   table.in("");
  // });

  await knex.schema.createTable("session", (table) => {
    table.increments("session_id").primary().notNullable();
    table
      .string("course_code")
      .references("code")
      .inTable("course")
      .onDelete("CASCADE");
    table.dateTime("session_date");
    table.integer("session_number");

    //each session includes many students from the course
  });

  await knex.schema.createTable("feedback", (table) => {
    table
      .uuid("id")
      .unique()
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));

    table.text("feedback_text");
    table.integer("rating", 5).notNullable();
    table.enum("impulse_strategy", ["angry", "happy", "sad", "none"]);
    table.uuid("written_by").references("id").inTable("user");
    table.timestamps(true, true);

    //one session can have many feedbacks
    table.integer("session_id").references("session_id").inTable("session");

    //if feedback was on a course in general
    table.string("course_code", 5).references("code").inTable("course");

    table.uuid("student_id").references("id").inTable("user");
  });
  //feedback table

  await knex.schema.createTable("comment", (table) => {
    table
      .uuid("id")
      .unique()
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.text("comment_text");
    table.uuid("feedback_id").references("id").inTable("feedback");
    table.uuid("written_by").references("id").inTable("user");
    table.timestamps(true, true);
  });
  //options for sessions i think
  // await knex.schema.createTable("options", (table) => {
  //   table
  //     .uuid("id")
  //     .unique()
  //     .notNullable()
  //     .primary()
  //     .defaultTo(knex.raw("uuid_generate_v4()"));
  //   table.text("comment_text");
  //   table.timestamps(true, true);
  // });
  await knex.schema.createTable("checkpoint", (table) => {
    table
      .uuid("id")
      .unique()
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.text("checkpoint_text").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("course_student");
  await knex.schema.dropTableIfExists("comment");
  await knex.schema.dropTableIfExists("option");
  await knex.schema.dropTableIfExists("goal");
  await knex.schema.dropTableIfExists("feedback");
  await knex.schema.dropTableIfExists("session");
  await knex.schema.dropTableIfExists("course_time");
  await knex.schema.dropTableIfExists("course");
  await knex.schema.dropTableIfExists("checkpoint");
  await knex.schema.dropTableIfExists("milestone");

  return knex.schema.dropTableIfExists("user");
};
