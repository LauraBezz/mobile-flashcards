import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import {DECKS_STORAGE_KEY, NOTIFICATION_KEY, DECKS_DEFAULT} from './_DATA.js'

function createNotification () {
	return {
		title: 'Do exercise!',
		body: "👋 don't forget to do a quiz for today!",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true,
		}
	}
}

export function formatDeckResults () {
	return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(DECKS_DEFAULT))
}

export function setLocalNotification () {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {

			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({ status }) => {
						if (status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync()

							let tomorrow = new Date()
							tomorrow.setDate(tomorrow.getDate())
							tomorrow.setHours(20)
							tomorrow.setMinutes(0)

							Notifications.scheduleLocalNotificationAsync(
								createNotification(),
								{
									time: tomorrow,
									repeat: 'day',
								}
							)

							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
						}
					})
			}
		})
}

export function clearLocalNotification () {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)
}