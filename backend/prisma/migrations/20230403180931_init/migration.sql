-- CreateTable
CREATE TABLE "Cargo" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "cargoDimensionCategoryId" INTEGER NOT NULL,
    "cargoDimensions" TEXT,
    "cargoWeight" DOUBLE PRECISION,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CargoDimensionCategory" (
    "id" SERIAL NOT NULL,
    "width" INTEGER NOT NULL,
    "depth" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "unitsOfSpace" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CargoDimensionCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coordinateX" DECIMAL,
    "coordinateY" DECIMAL,
    "addressDetails" JSON,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "belongsToEntityType" TEXT,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "fromLocationId" INTEGER NOT NULL,
    "toLocationId" INTEGER NOT NULL,
    "departure" TIMESTAMP(6) NOT NULL,
    "arrival" TIMESTAMP(6) NOT NULL,
    "peopleCapacity" INTEGER NOT NULL DEFAULT 0,
    "cargoCapacity" INTEGER NOT NULL DEFAULT 0,
    "tripRequestId" INTEGER NOT NULL,
    "statusId" INTEGER,
    "peopleCount" INTEGER NOT NULL DEFAULT 0,
    "cargoWeight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cargoVolume" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(6),
    "modifiedBy" INTEGER,
    "modifiedAt" TIMESTAMP(6),

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripRequest" (
    "id" SERIAL NOT NULL,
    "fromLocationId" INTEGER NOT NULL,
    "toLocationId" INTEGER NOT NULL,
    "departEarliest" TIMESTAMP(6),
    "departLatest" TIMESTAMP(6),
    "arriveEarliest" TIMESTAMP(6),
    "arriveLatest" TIMESTAMP(6),
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(6),
    "modifiedBy" INTEGER,
    "modifiedAt" TIMESTAMP(6),
    "statusId" INTEGER,
    "remarks" TEXT,

    CONSTRAINT "TripRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripRequestCargo" (
    "tripRequestId" INTEGER NOT NULL,
    "cargoId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "TripRequestCargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripRequestPerson" (
    "tripRequestId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "TripRequestPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripTicket" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER,
    "cargoId" INTEGER,
    "dependentTripId" INTEGER,
    "tripRequestId" INTEGER,
    "statusId" INTEGER,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(6),
    "modifiedBy" INTEGER,
    "modifiedAt" TIMESTAMP(6),

    CONSTRAINT "TripTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fki_FK_Trip_TripRequestId_TripRequest_Id" ON "Trip"("tripRequestId");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_fromLocationId_fkey" FOREIGN KEY ("fromLocationId") REFERENCES "Location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_toLocationId_fkey" FOREIGN KEY ("toLocationId") REFERENCES "Location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_tripRequestId_fkey" FOREIGN KEY ("tripRequestId") REFERENCES "TripRequest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripRequest" ADD CONSTRAINT "TripRequest_fromLocationId_fkey" FOREIGN KEY ("fromLocationId") REFERENCES "Location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripRequest" ADD CONSTRAINT "TripRequest_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripRequest" ADD CONSTRAINT "TripRequest_toLocationId_fkey" FOREIGN KEY ("toLocationId") REFERENCES "Location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripRequestCargo" ADD CONSTRAINT "TripRequestCargo_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripRequestCargo" ADD CONSTRAINT "TripRequestCargo_tripRequestId_fkey" FOREIGN KEY ("tripRequestId") REFERENCES "TripRequest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripRequestPerson" ADD CONSTRAINT "TripRequestPerson_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripRequestPerson" ADD CONSTRAINT "TripRequestPerson_tripRequestId_fkey" FOREIGN KEY ("tripRequestId") REFERENCES "TripRequest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripTicket" ADD CONSTRAINT "TripTicket_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripTicket" ADD CONSTRAINT "TripTicket_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripTicket" ADD CONSTRAINT "TripTicket_modifiedBy_fkey" FOREIGN KEY ("modifiedBy") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripTicket" ADD CONSTRAINT "TripTicket_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripTicket" ADD CONSTRAINT "TripTicket_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
