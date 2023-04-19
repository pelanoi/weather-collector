# Weather collector

This is a small script that uses [rtl_443](https://github.com/merbanan/rtl_433) to read radio data from wireless weather stations and push it to the API.

For now, I run it on a Raspberry Pi, so everything here is thought with the Pi in mind, but, it should be able to run on any UNIX system.

## Installation

First thing, obviously, clone/copy the code from this repo on your Pi, then install internal dependencies by running the following command:

```bash
npm install
```

Afterward, proceed to install external dependencies:

### rtl_443
This is responsible for reading the radio signal and passing the output to our code.

See [their docs](https://github.com/merbanan/rtl_433/blob/master/docs/BUILDING.md) for details on building and installing rtl_443.

To test it works, either run `rtl_443`` by itself or better yet run `node index.js` in the folder where you cloned this code.

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

Make sure to modify the file's `directory` entry to point to the path where you cloned the code.

Then, start the supervisor process by running:

```bash
sudo supervisorctl start weather
```

Now you should be up and running pushing weather data to the API.

## USB reset

Cheap RTL-SDR tuners tend to lock up after a while due to overheating. To solve this issue we have to compile this small script that will make sure the tuner will be reset when it gets locked.

Compile it with:

```bash
cc misc/usbreset.c -o misc/usbreset
chmod +x misc/usbreset
```

The main script will know how to use it from here.



