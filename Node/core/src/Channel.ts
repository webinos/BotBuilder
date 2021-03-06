// 
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
// 
// Microsoft Bot Framework: http://botframework.com
// 
// Bot Builder SDK Github:
// https://github.com/Microsoft/BotBuilder
// 
// Copyright (c) Microsoft Corporation
// All rights reserved.
// 
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

import ses = require('./Session');

export var channels = {
    facebook: 'facebook',
    skype: 'skype',
    telegram: 'telegram',
    kik: 'kik',
    email: 'email',
    slack: 'slack',
    groupme: 'groupme',
    sms: 'sms',
    emulator: 'emulator'
};

export function supportsKeyboards(session: ses.Session, buttonCnt = 100) {
    switch (getChannelId(session)) {
        case channels.facebook:
            return (buttonCnt <= 10);
        case channels.kik:
            return (buttonCnt <= 20);
        case channels.slack:
        case channels.telegram:
        case channels.emulator:
            return (buttonCnt <= 100);
        default:
            return false;
    }
}

export function supportsCardActions(session: ses.Session, buttonCnt = 100) {
    switch (getChannelId(session)) {
        case channels.facebook:
        case channels.skype:
            return (buttonCnt <= 3);
        case channels.slack:
            return (buttonCnt <= 100);
        default:
            return false;
    }
}

export function getChannelId(addressable: ses.Session|IMessage|IAddress): string {
    var channelId: string;
    if (addressable) {
        if (addressable.hasOwnProperty('message')) {
            channelId = (<ses.Session>addressable).message.address.channelId;
        } else if (addressable.hasOwnProperty('address')) {
            channelId = (<IMessage>addressable).address.channelId;
        } else if (addressable.hasOwnProperty('channelId')) {
            channelId = (<IAddress>addressable).channelId;
        }
    }
    return channelId ? channelId.toLowerCase() : '';    
}
