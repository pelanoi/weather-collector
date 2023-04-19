# Weather collector

This is a small script that uses [rtl_443](https://github.com/merbanan/rtl_433) to read radio data from wireless weather stations and push it to the API.

For now, I run it on a Raspberry Pi, so everything here is thought with the Pi in mind, but, it should be able to run on any UNIX system.

This documentation assumes that you cloned this code in the home directory (`/home/pi`).

## Installation

First thing, obviously, clone/copy the code from this repo on your Pi, then install internal dependencies by running the following command:

```bash
npm install
```

## External dependencies

Next, we proceed to install external dependencies:

### rtl_443
This is responsible for reading the radio signal and passing the output to our code.

```
sudo apt-get install rtl-433
```

Test it out using

```
rtl_433 -R 32
```

**Getting the following error?**

```
usb_open error -3
```

Use `lsusb` to get the vendor id and product id for your dongle.

In my case, the output is

```
Bus 001 Device 009: ID 0bda:2838 Realtek Semiconductor Corp. RTL2838 DVB-T
```

so vendor id is `0bda` and product id is `2838`.

Knowing this, create a file called `/etc/udev/rules.d/20.rtlsdr.rules` with the following contents:

```
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bda", ATTRS{idProduct}=="2838", GROUP="adm", MODE="0666", SYMLINK+="rtl_sdr"
```

With the vendor and product ids for your particular dongle.

### USB reset

Cheap RTL-SDR tuners tend to lock up after a while due to overheating. To solve this issue we have to compile this small script that will make sure the tuner will be reset when it gets locked.

Compile it with:

```bash
cc misc/usbreset.c -o misc/usbreset
chmod +x misc/usbreset
```

The main script will know how to use it from here.

### Supervisor

We need this to make sure the process will run continuously on the Pi.

Install it using:

```bash
sudo apt-get install supervisor
```

Then copy the config file provided in the `misc` folder of this project:

```bash
sudo cp ./misc/supervisor/weather.conf /etc/supervisor/conf.d/weather.conf
```

Next, create the folder that will hold the logs:

```bash
sudo mkdir /var/log/weather/
```

Finally, start the supervisor program by running:

```bash
sudo supervisorctl reread
sudo supervisorctl reload
```

Now you should be up and running pushing weather data to the API.

If you want to re-start the supervisor program, just run

```bash
sudo supervisorctl restart weather
```

## Logs

Logs are available at the following location by default:

```
/var/log/weather/weather.log
/var/log/weather/weather.err.log
```


