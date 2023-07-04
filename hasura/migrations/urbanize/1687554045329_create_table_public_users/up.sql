CREATE TABLE "public"."users" ("id" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "last_seen" timestamptz, PRIMARY KEY ("id") );
