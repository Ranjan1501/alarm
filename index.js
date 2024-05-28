class AlarmClock {
  constructor(hour, minute, dayOfTheWeek) {
    this.hour = hour;
    this.minute = minute;
    this.dayOfTheWeek = dayOfTheWeek;
    this.isSnoozed = false;
    this.snoozeCount = 0;
  }

  setAlarm(hour, minute) {
    this.hour = hour;
    this.minute = minute;
  }

  setAlarmWithDay(dayOfTheWeek) {
    this.dayOfTheWeek = dayOfTheWeek;
  }

  displayTime() {
    console.log(
      `The time is ${this.hour}:${this.minute} on ${this.dayOfTheWeek}`
    );
  }

  snooze() {
    if (this.snoozeCount >= 3) {
      console.log(
        "You can snooze this alarm to maxmimum 3 times only and you already snoozed till allotted snooze count"
      );
      return;
    }
    this.snoozeCount++;
    this.isSnoozed = true;
    const snoozeInterval = 5;
    this.minute += snoozeInterval;

    if (this.minute >= 60) {
      this.hour += Math.floor(this.minute / 60);
      this.minute = this.minute % 60;
      if (this.hour >= 24) {
        this.hour = this.hour % 24;
      }
    }

    console.log("Alarm is snoozed for next 5 minutes");
    console.log(`Next alarm will be at ${this.hour}:${this.minute}`);
  }

  deleteAlarm() {
    this.hour = 0;
    this.minute = 0;
    this.dayOfTheWeek = "";
    this.isSnoozed = false;
    this.snoozeCount = 0;
    console.log(
      `Alarm with time ${this.hour}: ${this.minute} day ${this.dayOfTheWeek} has been deleted`
    );
  }
}

class ScheduleAlarm extends AlarmClock {
  constructor() {
    super();
    this.map = new Map();
    this.index = 0;
  }

  displayCurrentTime() {
    const currentTime = new Date();
    console.log(
      `Current time is ${currentTime.getHours()}:${currentTime.getMinutes()}`
    );
  }

  createNewAlarm(hour, minute, dayOfTheWeek) {
    const newAlarm = new AlarmClock(hour, minute, dayOfTheWeek);
    this.index++;
    this.map.set(this.index, newAlarm);
  }

  snoozeAlarm(index) {
    const alarm = this.map.get(index);
    if (alarm) {
      alarm.snooze();
    } else {
      console.log(`No alarm found at index ${index}`);
    }
  }

  deleteAlarm(index) {
    const alarm = this.map.get(index);
    if (alarm) {
      alarm.deleteAlarm();
      this.map.delete(index);
    } else {
      console.log(`No alarm found at index ${index}`);
    }
  }

  displayAlarms() {
    for (const [key, value] of this.map) {
      console.log(
        `Alarm ${key} is scheduled at ${value.hour}:${value.minute} on ${value.dayOfTheWeek}`
      );
    }
  }
}

const scheduleAlarm = new ScheduleAlarm();
scheduleAlarm.createNewAlarm(11, 30, "Monday");
scheduleAlarm.createNewAlarm(12, 30, "Tuesday");
scheduleAlarm.createNewAlarm(13, 30, "Wednesday");

scheduleAlarm.displayCurrentTime();
scheduleAlarm.displayAlarms();

scheduleAlarm.snoozeAlarm(1);
scheduleAlarm.snoozeAlarm(1);
scheduleAlarm.snoozeAlarm(1);
scheduleAlarm.snoozeAlarm(1);

scheduleAlarm.displayAlarms();
scheduleAlarm.deleteAlarm(2);
scheduleAlarm.displayAlarms();
