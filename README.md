### Bluetooth advertising information (dev reference)
* Configure the Bluez stack on a raspberry pi
* `cd` to the `tools/` folder
* Run the following commands:

```bash
# get the BLE device UP and running
$ sudo hciconfig hci0 up

# start advertising in a broadcast-only, no-connect mode (3)
# optionally, use 0 for a connectable mode; this may cause timeouts
$ sudo hciconfig hci0 leadv 3

# stop scanning for nearby devices to avoid interference
$ sudo hciconfig hci0 noscan
```

* At this point, running `$ sudo hciconfig` ought to give output similar to:

```
hci0:	Type: BR/EDR  Bus: USB
	BD Address: 00:1A:7D:DA:71:13  ACL MTU: 310:10  SCO MTU: 64:8
	UP RUNNING
	RX bytes:1210 acl:0 sco:0 events:65 errors:0
	TX bytes:762 acl:0 sco:0 commands:63 errors:0
```
*(note the UP RUNNING part)*

* Next, we need to start advertising the data we want:

```
sudo hcitool -i hci0 cmd 0x08 0x0008 1e 02 01 1a 1a ff 4c 00 02 15 1f 16 9f 64 d2 1d 4a 69 ac 5f 27 1d b6 29 ca ca 00 01 00 02 c8 00
```

It's an arcane command, but it's worth knowing the (inexhaustive) explanation:
  * `hcitool` is a command line utility provided by the Bluez stack
  * `-i hci0` is an argument specifying the first connected bluetooth device as the target
  * `cmd` is a way to execute any hexadecimal based command over the bluetooth device
  * `0x08 0x0008` is OGF followed by OCF, arcane stuff from Core Bluetooth Spec
  * `1e`, which is 30 in decimal, is the length of the command that follows
  * `02 01 1a 1a` are again switches/flags/details from the Core Spec that I chose to skip understanding
  * `ff` signals the start of Manufacture Specific data
  * `4c 00` is the [Company Identifier](https://www.bluetooth.org/en-us/specification/assigned-numbers/company-identifiers) for Apple Inc
  * `02` is once again some sort of flag, which always is supposed to be `02`
  * `15` is again the length of the bytes that follow (I may be wrong here)
  * `1f 16 9f 64 d2 1d 4a 69 ac 5f 27 1d b6 29 ca ca` is the UUID I [chose](https://www.uuidgenerator.net/) for my beacons
  * `00 01` is the MAJOR identifier
  * `00 02` is the MINOR identifier
  * A combination of the MAJOR and MINOR allows you to distinguish different beacons bearing
    the same (your) UUID.
  * `c8` is something related to the amount of power transmitted, that value works for me.
  * `00` is padding to make sure the lengths specified earlier, match up to this sequence's length
