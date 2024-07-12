# EdgeDB

## Installation

- [ ] install edgedb CLI
- [ ] install VS Code extension (magicstack.edgedb)
- [ ] run `edgedb project init`
- [ ] run `edgedb ui`

## Schemas

Files in this directory (`.dbschema`) with the `.esdl` extension are schema files. Each file can have one to many modules. The EdgeDB CLI will pick them all up in the migration process.

## Migrations

- [ ] Generate migrations files from schema changes: `edgedb migration create`
- [ ] Apply migrations to your local EdgeDB instance: `edgedb migration apply`

## Code Generators

You can generate the Typescript EdgeDB client in any project. Note that this needs to be done for each project that accesses local EdgeDB.

Local to a project, install the dependencies:

```sh
pnpm add --save-prod edgedb          # database driver
pnpm add --save-dev @edgedb/generate # generators
```

Then, outside dbschema folder, in your `package.json` file, run the following scripts:

```sh
	pnpm run setup
```