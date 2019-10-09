FROM osrm/osrm-backend:latest

RUN  apt-get update \
  && apt-get install -y wget \
  && rm -rf /var/lib/apt/lists/*

RUN wget http://download.geofabrik.de/europe/france/alsace-latest.osm.pbf

RUN osrm-extract alsace-latest.osm.pbf -p /opt/car.lua
# in osrm-extract, "-p" means profiles and needs to be before a .lua file in contrary to the documentation with docker run

RUN osrm-partition alsace-latest.osrm

RUN osrm-customize alsace-latest.osrm

CMD osrm-routed --algorithm mld alsace-latest.osrm
# launch the osrm server
