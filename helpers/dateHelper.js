const { DateTime } = require('luxon');

class RandomDateGenerator { 
    static generateDueDate() {
        return DateTime.now().plus({ days: 30 }).toUTC().toISO();
    }

    static generatePublishDate() {
        return DateTime.now().minus({ month: 1 }).toUTC().toISO();
    }
}

module.exports = RandomDateGenerator;
