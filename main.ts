function objektSicher () {
    objektVorhanden = 1
    sendeDaten(objektVorhanden)
}
function objektGeklaut () {
    objektVorhanden = 0
    sendeDaten(objektVorhanden)
}
function sendeDaten (status: number) {
    if (control.millis() > msBeiLetztemSenden + 10000) {
        IoTCube.addBinary(eIDs.ID_0, status)
        IoTCube.SendBufferSimple()
        spaeterSenden = false
        msBeiLetztemSenden = control.millis()
    } else {
        spaeterSenden = true
    }
}
let objektVorhanden = 0
let msBeiLetztemSenden = 0
let spaeterSenden = false
let sendeErlaubnis = false
IoTCube.LoRa_Join(
eBool.enable,
eBool.enable,
10,
8
)
while (!(IoTCube.getStatus(eSTATUS_MASK.JOINED))) {
    basic.showIcon(IconNames.Pitchfork)
}
basic.showIcon(IconNames.Yes)
spaeterSenden = false
msBeiLetztemSenden = control.millis()
objektSicher()
loops.everyInterval(500, function () {
    if (spaeterSenden) {
        sendeDaten(objektVorhanden)
    }
})
basic.forever(function () {
    if (smartfeldSensoren.measureInCentimetersV2(DigitalPin.P1) > 10) {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        objektGeklaut()
    } else {
        objektSicher()
    }
})
