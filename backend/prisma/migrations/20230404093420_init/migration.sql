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
    "name" TEXT NOT NULL,
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
    "cargoVolumeCapacity" INTEGER NOT NULL DEFAULT 0,
    "cargoWeightCapacity" INTEGER NOT NULL DEFAULT 0,
    "tripRequestId" INTEGER,
    "statusId" INTEGER,
    "peopleCount" INTEGER NOT NULL DEFAULT 0,
    "cargoWeight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cargoVolume" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(6),
    "modifiedById" INTEGER,
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
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(6),
    "modifiedById" INTEGER,
    "modifiedAt" TIMESTAMP(6),
    "statusId" INTEGER,
    "remarks" TEXT,

    CONSTRAINT "TripRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripTicket" (
    "id" SERIAL NOT NULL,
    "tripId" INTEGER NOT NULL,
    "personId" INTEGER,
    "cargoId" INTEGER,
    "dependentTripId" INTEGER,
    "tripRequestId" INTEGER,
    "statusId" INTEGER,
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(6),
    "modifiedById" INTEGER,
    "modifiedAt" TIMESTAMP(6),

    CONSTRAINT "TripTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CargoToTripRequest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PersonToTripRequest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "fki_FK_Trip_TripRequestId_TripRequest_Id" ON "Trip"("tripRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "_CargoToTripRequest_AB_unique" ON "_CargoToTripRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_CargoToTripRequest_B_index" ON "_CargoToTripRequest"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PersonToTripRequest_AB_unique" ON "_PersonToTripRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_PersonToTripRequest_B_index" ON "_PersonToTripRequest"("B");

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_cargoDimensionCategoryId_fkey" FOREIGN KEY ("cargoDimensionCategoryId") REFERENCES "CargoDimensionCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_fromLocationId_fkey" FOREIGN KEY ("fromLocationId") REFERENCES "Location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_modifiedById_fkey" FOREIGN KEY ("modifiedById") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ALTER TABLE "TripRequest" ADD CONSTRAINT "TripRequest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripRequest" ADD CONSTRAINT "TripRequest_modifiedById_fkey" FOREIGN KEY ("modifiedById") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripTicket" ADD CONSTRAINT "TripTicket_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripTicket" ADD CONSTRAINT "TripTicket_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripTicket" ADD CONSTRAINT "TripTicket_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripTicket" ADD CONSTRAINT "TripTicket_modifiedById_fkey" FOREIGN KEY ("modifiedById") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripTicket" ADD CONSTRAINT "TripTicket_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TripTicket" ADD CONSTRAINT "TripTicket_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_CargoToTripRequest" ADD CONSTRAINT "_CargoToTripRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "Cargo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CargoToTripRequest" ADD CONSTRAINT "_CargoToTripRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "TripRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonToTripRequest" ADD CONSTRAINT "_PersonToTripRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonToTripRequest" ADD CONSTRAINT "_PersonToTripRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "TripRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
