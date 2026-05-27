# GPSD

This is a raw source-layer note for the Architecture Wiki. It summarizes
architecture-relevant information from AOSA and should be used as input for
reviewed wiki pages, ADRs, components, patterns, and quality-attribute pages.

## Source References

- AOSA Volume 2, "GPSD": https://aosabook.org/en/v2/gpsd.html

## Project Purpose

GPSD is a daemon that receives data from GPS and other location sensors and makes normalized position, time, and device information available to client applications.

## Architectural Style

- Daemon/client architecture
- Device driver adapter architecture
- State-machine parser architecture
- Protocol normalization architecture

## Main Components

- GPSD daemon
- Device drivers
- Packet sniffer and protocol decoder
- Device session state
- Client protocol server
- Shared client libraries
- Configuration and hotplug integration

## Interfaces

- Serial, USB, Bluetooth, and network device interfaces
- GPS device protocols such as NMEA and binary protocols
- Client socket protocol
- JSON reporting interface
- Library API
- Hotplug interface

## Data and State Management

- Device input streams are decoded into normalized fix, time, satellite, and device state.
- Session state tracks device type, mode, baud rate, and current observations.
- Clients subscribe to reports and receive normalized location data.
- Drivers translate vendor protocol data into common structures.

## Quality Attributes

- Interoperability across many GPS devices
- Reliability for continuous daemon operation
- Modifiability through driver separation
- Performance through efficient streaming parsers
- Usability through normalized client APIs

## Key Architectural Decisions

- Centralize device access in a daemon so multiple clients can share sensors.
- Normalize many device protocols into common reports.
- Use driver and packet-detection logic to support varied hardware.
- Expose location data through a client protocol and libraries.
- Keep parsers robust against noisy device streams.

## Tradeoffs

- A central daemon simplifies client programs but becomes a dependency.
- Protocol normalization hides device differences but may lose special features.
- Supporting many devices increases parsing and testing burden.
- Long-running device IO needs defensive error handling.

## Useful Wiki Pages To Create Later

- wiki/projects/gpsd.md
- wiki/components/device-driver.md
- wiki/components/protocol-decoder.md
- wiki/patterns/adapter.md
- wiki/quality-attributes/interoperability.md
