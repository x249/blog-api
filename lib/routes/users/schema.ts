export const getUsersSchema = {
	response: {
		200: {
			description: 'Successfully requested all users',
			type: 'object',
			properties: {
				users: {
					type: 'array',
					description: 'Users',
					items: {
						type: 'object',
						properties: {
							id: {
								type: 'integer',
								description: 'User ID',
							},
							fullName: {
								type: 'string',
								description: 'User full name',
							},
							email: {
								type: 'string',
								description: 'User email',
							},
							createdAt: {
								type: 'string',
								description: 'Date when the user was created',
							},
							updatedAt: {
								type: 'string',
								description: 'Date when the user was last updated',
							},
						},
					},
				},
			},
		},
		500: {
			type: 'object',
			description: 'Fail to get all users',
			properties: {
				error: {
					type: 'object',
					properties: {
						name: {
							type: 'string',
							description: 'Error name',
						},
						message: {
							type: 'string',
							description: 'Error message',
						},
						statusCode: {
							type: 'integer',
							description: 'Error status code',
						},
					},
				},
			},
		},
	},
};

export const getUserSchema = {
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'integer',
				description: 'User ID',
			},
		},
	},
	response: {
		200: {
			type: 'object',
			description: 'Successfully requested a user',
			properties: {
				user: {
					type: 'object',
					properties: {
						id: {
							type: 'integer',
							description: 'User ID',
						},
						fullName: {
							type: 'string',
							description: 'User full name',
						},
						email: {
							type: 'string',
							description: 'User email',
						},
						articles: {
							type: 'array',
							description: 'Articles belonging to the user',
							items: {
								type: 'object',
								properties: {
									id: {
										type: 'integer',
										description: 'Article ID',
									},
									title: {
										type: 'string',
										description: 'Article title',
									},
									body: {
										type: 'string',
										description: 'Article body',
									},
									category: {
										type: 'object',
										description: 'Category of the article',
										properties: {
											id: {
												type: 'integer',
												description: 'Category ID',
											},
											name: {
												type: 'string',
												description: 'Category name',
											},
											createdAt: {
												type: 'string',
												description: 'Date when the category was created',
											},
											updatedAt: {
												type: 'string',
												description: 'Date when the category was last updated',
											},
										},
									},
									createdAt: {
										type: 'string',
										description: 'Date when the article was created',
									},
									updatedAt: {
										type: 'string',
										description: 'Date when the article was last updated',
									},
								},
							},
						},
						createdAt: {
							type: 'string',
							description: 'Date when the user was created',
						},
						updatedAt: {
							type: 'string',
							description: 'Date when the user was last updated',
						},
					},
				},
			},
		},
		404: {
			type: 'object',
			description: 'Fail to get a user because they were not found',
			properties: {
				error: {
					type: 'object',
					properties: {
						name: {
							type: 'string',
							description: 'Error name',
						},
						message: {
							type: 'string',
							description: 'Error message',
						},
						statusCode: {
							type: 'integer',
							description: 'Error status code',
						},
					},
				},
			},
		},
		500: {
			type: 'object',
			description: 'Fail to get a user',
			properties: {
				error: {
					type: 'object',
					description: 'Error',
					properties: {
						name: {
							type: 'string',
							description: 'Error name',
						},
						message: {
							type: 'string',
							description: 'Error message',
						},
						statusCode: {
							type: 'integer',
							description: 'Error status code',
						},
					},
				},
			},
		},
	},
};

export const newUserSchema = {
	body: {
		type: 'object',
		properties: {
			fullName: {
				type: 'string',
			},
			email: {
				type: 'string',
			},
			password: {
				type: 'string',
			},
		},
	},
	response: {
		200: {
			type: 'object',
			properties: {
				user: {
					type: 'object',
					properties: {
						id: {
							type: 'number',
						},
						fullName: {
							type: 'string',
						},
						email: {
							type: 'string',
						},
						createdAt: {
							type: 'string',
						},
						updatedAt: {
							type: 'string',
						},
					},
				},
				token: {
					type: 'string',
				},
			},
		},
		400: {
			type: 'object',
			properties: {
				error: {
					type: 'object',
					properties: {
						name: {
							type: 'string',
						},
						message: {
							type: 'string',
						},
						statusCode: {
							type: 'integer',
						},
					},
				},
			},
			500: {
				type: 'object',
				properties: {
					error: {
						type: 'object',
						properties: {
							name: {
								type: 'string',
							},
							message: {
								type: 'string',
							},
							statusCode: {
								type: 'integer',
							},
						},
					},
				},
			},
		},
	},
};

export const authenticateUserSchema = {
	body: {
		type: 'object',
		properties: {
			email: {
				type: 'string',
			},
			password: {
				type: 'string',
			},
		},
	},
	response: {
		200: {
			type: 'object',
			properties: {
				user: {
					type: 'object',
					properties: {
						id: {
							type: 'number',
						},
						fullName: {
							type: 'string',
						},
						email: {
							type: 'string',
						},
						createdAt: {
							type: 'string',
						},
						updatedAt: {
							type: 'string',
						},
					},
				},
				token: {
					type: 'string',
				},
			},
		},
		403: {
			type: 'object',
			properties: {
				error: {
					type: 'object',
					properties: {
						name: {
							type: 'string',
						},
						message: {
							type: 'string',
						},
						statusCode: {
							type: 'integer',
						},
					},
				},
			},
			404: {
				type: 'object',
				properties: {
					error: {
						type: 'object',
						properties: {
							name: {
								type: 'string',
							},
							message: {
								type: 'string',
							},
							statusCode: {
								type: 'integer',
							},
						},
					},
				},
				500: {
					type: 'object',
					properties: {
						error: {
							type: 'object',
							properties: {
								name: {
									type: 'string',
								},
								message: {
									type: 'string',
								},
								statusCode: {
									type: 'integer',
								},
							},
						},
					},
				},
			},
		},
	},
};
